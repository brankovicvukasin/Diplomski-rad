import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useAuth from '../../../../hooks/useAuth.jsx';
import { getExpensesLocations } from '../../../../services/apiExpense';
import { useState, useEffect } from 'react';

function ShowMaps() {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    getExpensesLocations(user._id)
      .then((data) => {
        setExpenses(data.expenses);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  if (!expenses) return;
  console.log(loading, expenses);

  return (
    <div className="min-h-[screen] min-w-full overflow-x-auto">
      <MapContainer
        className="min-h-[100%] w-[100%] "
        center={[43.3, 21.9]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {expenses.map((expense) => (
          <Marker
            position={[expense.location.lat, expense.location.lng]}
            key={expense.id}
          >
            <Popup>
              <div className="flex flex-col p-4">
                <div className="mb-2">
                  <strong>Kategorija:</strong>{' '}
                  <div className="inline">{expense.category}</div>
                </div>
                <div className="mb-2 ">
                  <strong>Iznos:</strong>{' '}
                  <div className="inline text-green-500">
                    {expense.expenseAmount.toFixed(2)} RSD
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Opis:</strong>{' '}
                  <div className="inline">{expense.description}</div>
                </div>
                <div className="mb-2">
                  <strong>Datum:</strong>{' '}
                  <div className="inline">
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Grupa:</strong>{' '}
                  <div className="inline">
                    {expense.group ? expense.group.name : '-/-'}
                  </div>
                </div>
                <div className="mb-2 ">
                  <strong>Svačiji deo:</strong>{' '}
                  <div className="inline text-green-500">
                    {expense.everyonesPart.toFixed(2)} RSD
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Platio za sve:</strong>{' '}
                  <div className="inline">{expense.paidby.username}</div>
                </div>
                <div className="mb-4">
                  <strong>Članovi:</strong>
                  <div className="mt-2 flex flex-wrap">
                    {expense.members.map((member) => (
                      <div
                        key={member.id}
                        className="mb-2 mr-2 flex items-center"
                      >
                        <img
                          src={member.photo}
                          alt={member.username}
                          className="mr-2 h-4 w-4 rounded-full"
                        />
                        <div>{member.username}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ShowMaps;
