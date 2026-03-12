import React from 'react'
import HomePage from './Project/HomePage'

import { Route ,Routes} from 'react-router-dom'
import Navbar from './Project/Navbar'

import Signup from './Project/Signup'
import DataReport from'./Project/DataReport'
import SheltersPage from './Project/SheltersPage'
import Contact from './Project/Contact'
 import Page from './Project/Page'
import AboutUs from './Project/AboutUs'
import Services from './Project/Service1'
import ReportPage from './Project/ReportPage'
import Admin from './Project/Admin'
import UniqueImageUpload from './Project/UniqueImageUpload'
import ReportTable from './Project/ReportTable'
import VolunteerTable from './Project/VolunteerTable'
import Dashboard from './Project/Dashboard'
export default function App() {
  return (
    
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
   
        <Route path="/signup" element={<Signup />} />
        <Route path='/report' element={<DataReport/>}/>
        <Route path='/SheltersPage' element={<SheltersPage/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/reportpage' element={<ReportPage/>}/>
         <Route path='/image' element={<UniqueImageUpload/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/VolunteerTable' element={<VolunteerTable/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/reporttable' element={<ReportTable/>}/>
        <Route path='/Services' element={<Services/>}/>
        <Route path='/page' element={<Page/>}/>
        <Route path='/admin' element={<Admin/>}/>

        </Routes> 
        
        {/* <Page/> */}
    </div>
  )
}
