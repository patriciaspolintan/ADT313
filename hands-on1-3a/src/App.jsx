import logo from './logo.jpg';
import './App.css';
import Name from './components/Name/Name';
import Section from './components/Section/Section';
import Description from './components/Description/Description';

function App() {
    const userInformation = {
        firstName: 'Patricia Mae',
        lastName: 'Polintan',
        section: 'BSIT 3A',
        description: "3rd Year BS Information Technology Student at Dr. Yanga's Colleges Inc."
    }

    return (
        <div className="App">
            <Name firstName={userInformation.firstName} lastName={userInformation.lastName} />
            <Section section={userInformation.section} />
            <Description description={userInformation.description} />
        </div>
    )
}

export default App;
