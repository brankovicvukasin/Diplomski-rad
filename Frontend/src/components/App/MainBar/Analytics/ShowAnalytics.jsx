import { Chart } from 'react-google-charts';
import { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth.jsx';
import {
  getCategoryAnalytics,
  getNegativeDebtAnalytics,
  getPositiveDebtAnalytics,
  getGroupsAnalytics,
} from '../../../../services/apiAnalytics';

function ShowAnalytics() {
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsDebtNegative, setAnalyticsDebtNegative] = useState(null);
  const [analyticsDebtPositive, setAnalyticsDebtPositive] = useState(null);
  const [analyticsGroups, setAnalyticsGroups] = useState(null);

  const { user } = useAuth();

  /*KATEGORIJA */
  useEffect(() => {
    setLoading(true);
    getCategoryAnalytics(user._id)
      .then((data) => {
        setAnalyticsData(data.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  /*Dugovanje prema prijateljima */
  useEffect(() => {
    setLoading(true);
    getNegativeDebtAnalytics(user._id)
      .then((data) => {
        setAnalyticsDebtNegative(data.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  /*Prijatelji sto duguju */
  useEffect(() => {
    setLoading(true);
    getGroupsAnalytics(user._id)
      .then((data) => {
        setAnalyticsGroups(data.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  /*Grupe */
  useEffect(() => {
    setLoading(true);
    getPositiveDebtAnalytics(user._id)
      .then((data) => {
        setAnalyticsDebtPositive(data.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  console.log(loading);

  return (
    <div className="mt-10 flex w-full flex-wrap justify-around bg-white">
      <div className="w-full sm:w-1/3">
        {!analyticsData ? (
          <div>Ne postoji ni jedan trošak u bazi</div>
        ) : (
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={analyticsData}
            options={{
              title: 'Procentualna raspodela vaših troškova po kategorijama',
              is3D: true,
              backgroundColor: 'transparent',
              chartArea: { width: '90%', height: '70%' },
            }}
          />
        )}
      </div>

      <div className="w-full overflow-visible sm:w-1/2">
        {!analyticsDebtNegative ? (
          <div>Nemate dugovanja prema prijateljima</div>
        ) : (
          <Chart
            chartType="BarChart"
            width="100%"
            height="500px"
            data={analyticsDebtNegative}
            options={{
              title: 'Prikaz vaših dugovanja prema prijateljima',
              is3D: true,
              legend: 'none',
              backgroundColor: 'transparent',
              colors: ['red'],
              chartArea: { width: '60%', height: '70%' },
            }}
          />
        )}
      </div>

      <div className="w-full overflow-visible p-4 sm:w-1/2">
        {!analyticsGroups ? (
          <div>Niste član nijedne grupe</div>
        ) : (
          <Chart
            chartType="Bar"
            width="100%"
            height="500px"
            data={analyticsGroups}
            options={{
              title: 'Procentualna raspodela vaših troškova po grupama',
              is3D: true,
              backgroundColor: 'transparent',
              chartArea: { width: '100%', height: '100%' },
            }}
          />
        )}
      </div>

      <div className="w-full overflow-visible sm:w-1/2">
        {!analyticsDebtPositive ? (
          <div>Vaši prijatelji vam ništa ne duguju</div>
        ) : (
          <Chart
            chartType="BarChart"
            width="100%"
            height="500px"
            data={analyticsDebtPositive}
            options={{
              title: 'Prikaz dugovanja vaših prijatelja',
              is3D: true,
              backgroundColor: 'transparent',
              colors: ['green'],
              legend: 'none',
              chartArea: { width: '60%', height: '70%' },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ShowAnalytics;
