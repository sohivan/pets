import React, { useState, useCallback, useEffect } from 'react';
import './CreateProfile.css';

function getUserProfile(email) {
    return fetch('http://localhost:3001/user/profile', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            email
        })
    })
}

function getPetOwnerProfile(id) {
    if (!id) {
        return;
    }

    return fetch('http://localhost:3001/user/petowner', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            id
        })
    })
}

function getCareTakerProfile(id) {
    if (!id) {
        return;
    }

    return fetch('http://localhost:3001/user/caretaker', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            id
        })
    })
}

async function fetchUserProfile(email, setName, setType, setId, setError) {
    try {
        if (!email) {
            alert("No email detected")
        }

        let resp = await getUserProfile(email)
        let result = await resp.json()

        if (result.status === "success") {
            setName(result.data.name)
            setType(result.data.type)
            setId(result.data.id)
        }
    } catch (e) {
        console.error(e)

        setError(e)
    }
}


async function fetchPetOwner(type, id, setError, setPets) {
    if (type === "Petowner") {
        try {
            let resp = await getPetOwnerProfile(id)
            let data = await resp.json()

            if(data.data && data.data.info) {
                setPets(data.data.info)
            }
        } catch (e) {
            setError(JSON.stringify(e))
        }
    }

}

async function fetchCareTaker(type, id, setError, setServices) {
    if (type === "Caretaker") {
        try {
            let resp = await getCareTakerProfile(id)
            let data = await resp.json()

            if(data.data && data.data.info) {
                setServices(data.data.info)
            }
        } catch (e) {
            setError(JSON.stringify(e))
        }
    }

}

function Explore({ history }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [anyErrors, setError] = useState('');
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const email = localStorage.getItem("email");



    useEffect(() => {
        fetchUserProfile(email, setName, setType, setId, setError)
    }, [email])

    useEffect(() => {
        fetchPetOwner(type, id, setError,  setPets)
    }, [type, id])

    useEffect(() => {
        fetchCareTaker(type, id, setError,  setServices)
    }, [type, id])

    return (
        <html>
            <div>
                {anyErrors}
            </div>
            <section class="intro-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-1 col-lg-2"></div>
                        <div class="col-md-10 col-lg-8">
                            <div class="intro">
                                <div class="profile-img"><img src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" alt="" /></div>
                                <h2><b>{name.toUpperCase()}</b></h2>
                                <h4 class="font-yellow">{type}</h4>
                                <ul class="information margin-tb-30">
                                    <li><b>EMAIL : </b>{email}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Webpage for Caretakers */}
            {(type === "Caretaker") &&
                <section class="portfolio-section section">
                <div class="portfolioContainer  margin-b-50">
                    {
                        services.map(i => {
                            return (
                                // Could be good to group by service and within the own website, differentiate by time instead of the current format
                                <div class="p-item web-design">
                                <p>Service name: {i['service']}</p>
                                <p>Service start: {i['startdate']}</p>
                                <p>Service end: {i['enddate']}</p>
                                <p>Service Description: {i['description']}</p>
                                <p>Service Rate: {i['rate']}</p>

                                    {/* Links to service */}
                                    <a href="services" data-fluidbox>
                                        <img src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/2018-02/vicious_dog_0.png?itok=nsghKOHs" alt="" /></a>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            }

            {/* Webpage for PetOwners */}
            {(type === "Petowner") &&
                <section class="portfolio-section section">
                    <div class="portfolioContainer  margin-b-50">
                        {
                            pets.map(i => {
                                return (
                                    <div class="p-item web-design">
                                    <p>Pet Name: {i['name']}</p>
                                    <p>Pet Breed: {i['breed']}</p>
                                    <p>Pet Age: {i['age']}</p>

                                        {/* Links to pet page */}
                                        <a href="pets" data-fluidbox>
                                            <img src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/2018-02/vicious_dog_0.png?itok=nsghKOHs" alt="" /></a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            }
        </html>
    );
}


export default Explore;
