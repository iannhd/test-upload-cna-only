// import NavbarComponent from "../components/navbarLanding";
import Header from '../header';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const aStyle = {
      textDecoration: "none",
      color: "black",
    }
  

export default function LandingPageComponent() {

  return(
    <>
      <div className='landingpage'>
        <Header title='Landing Page'/>
        <div className='wrapperUp'>
          <div className='content'>
            <h1>PLAY TRADITIONAL GAME</h1>
            <h3>Experience New Traditional Game Play</h3>
            <div>
              <Button color="warning" size="lg">
                <Link href="/played-dummy">
                <a style={aStyle}>PLAY NOW</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className='wrapperDown'>
          <h6>THE STORY</h6>
          <a href="/landing-page">
            <FontAwesomeIcon icon={faCaretDown} />
          </a>
        </div>
      </div>
    </>
  )
}