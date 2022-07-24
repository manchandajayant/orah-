import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "index.css"
import StaffApp from "staff-app/app"
import { GlobalStyle } from "shared/styles/global-style"
import { RollProvider } from "context/student-context-api"
import NotFoundComponent from "staff-app/error-pages/404"

const Home: React.FC = () => {
    return (
        <div className="app">
            <img src="https://uploads-ssl.webflow.com/5b0c6e0c417228ad9bf005d9/5fbf8b3c7c62831b52ac1de5_orahLogoArtboard%201.svg" height={80} width={80} className="orah-img"/>                
            <header className="app-header">
            <h1 className="heading-app">Daily Care</h1>
            <Link to="staff/daily-care" className="link-to-staff">Staff</Link>
            </header>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <BrowserRouter>
            <RollProvider>
                <Routes>
                    <Route path="/" element={<Home>Engineering Test</Home>} />
                    <Route path="staff/*" element={<StaffApp />} />
                    <Route path="*" element={<NotFoundComponent />} />
                </Routes>
            </RollProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)
