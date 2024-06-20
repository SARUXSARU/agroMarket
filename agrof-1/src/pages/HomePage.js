import './HomePage.css';
import AdList from '../components/AdList';
import Navbar from '../components/Navbar';
import PageInfoBar from '../components/PageInfoBar';



function HomePage(){
  document.title="AgroMarket - Ostatnio Dodane";
  return (
    <div className="HomePage">
      <Navbar  ></Navbar> 
      <PageInfoBar></PageInfoBar>
      <AdList></AdList>
    </div>
  );
}
export default HomePage;
