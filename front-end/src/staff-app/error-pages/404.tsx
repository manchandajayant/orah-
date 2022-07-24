import React from "react"
import { Images } from "assets/images"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Link } from "react-router-dom"

const NotFoundComponent = () => {
    return (
        <>
            <Link to="/">
                <img src="https://uploads-ssl.webflow.com/5b0c6e0c417228ad9bf005d9/5fbf8b3c7c62831b52ac1de5_orahLogoArtboard%201.svg" height={80} width={80} className="orah-img" />
            </Link>
            <CenteredContainer>
                <img src={Images.error404} width={100} height={100} />
                <h3>Sorry, Not page found</h3>
            </CenteredContainer>
        </>
    )
}

export default NotFoundComponent
