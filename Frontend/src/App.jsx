import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Application from './pages/Application';
import PageNotFound from './pages/PageNotFound';
import ShowExpenses from './components/App/MainBar/Expense/ShowExpenses';
import ShowFriends from './components/App/MainBar/Friends/ShowFriends';
import ShowGroups from './components/App/MainBar/Groups/ShowGroups';
import AddExpenseForm from './components/App/MainBar/Expense/AddExpenseForm';
import AddFriendForm from './components/App/MainBar/Friends/AddFriendForm';
import AddGroupForm from './components/App/MainBar/Groups/AddGroupForm';
import ShowAnalytics from './components/App/MainBar/Analytics/ShowAnalytics';
import ShowMaps from './components/App/MainBar/Maps/ShowMaps';
import { AuthProvider } from './context/AuthContext';
import Authorization from './pages/Authorization';
import ShowUsers from './components/Admin/ShowUsers';
import Wellcome from './pages/Wellcome';
import Google from './pages/Google';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/googleAuth" element={<Google />} />
          <Route
            path="/app"
            element={
              <Authorization>
                <Application />
              </Authorization>
            }
          >
            <Route index element={<Wellcome />} />
            <Route path="friends" element={<ShowFriends />} />
            <Route path="admin" element={<ShowUsers />} />
            <Route path="addfriend" element={<AddFriendForm />} />
            <Route path="groups" element={<ShowGroups />} />
            <Route path="addgroup" element={<AddGroupForm />} />
            <Route path="expenses" element={<ShowExpenses />} />
            <Route path="addexpense" element={<AddExpenseForm />} />
            <Route path="analytics" element={<ShowAnalytics />} />
            <Route path="maps" element={<ShowMaps />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
