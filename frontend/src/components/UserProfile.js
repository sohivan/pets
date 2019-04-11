import React, { useState, useCallback, useEffect } from 'react';
import {Button} from 'antd';
import './UserProfile.css';

function getUserProfile(id) {
    return fetch('http://localhost:3001/user/profile', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            id
        }),
        credentials: 'include'
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
        }),
        credentials: 'include'
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
        }),
        credentials: 'include'
    })
}

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

async function fetchUserProfile(email, setName, setType, setId, setDescription, setError, params) {
    try {
        let id;
        if (params.id == null) {
          id = getCookie("userId");
        } else {
          id = params.id;
        }
        let resp = await getUserProfile(id)
        let result = await resp.json()

        if (result.status === "success") {
            setName(result.data.name)
            setType(result.data.type)
            setId(result.data.id)
            setDescription(result.data.description)
        }
    } catch (e) {
        console.error(e)

        setError(e)
    }
}


async function fetchPetOwner(type, id, setError, setPets) {
    if (type === "Petowner" || type === "Both") {
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
    if (type === "Caretaker" || type === "Both") {
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


function Explore({ history, match }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [anyErrors, setError] = useState('');
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const email = localStorage.getItem("email");


    useEffect(() => {
        fetchUserProfile(email, setName, setType, setId, setDescription, setError, match.params)
    }, [email])

    useEffect(() => {
        fetchPetOwner(type, id, setError,  setPets)
    }, [type, id])

    useEffect(() => {
        fetchCareTaker(type, id, setError,  setServices)
    }, [type, id])


    return (
        <html>
            <section class="intro-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-1 col-lg-2"></div>
                        <div class="col-md-10 col-lg-8">
                            <div class="intro">
                                <div class="profile-img"><img src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" alt="" /></div>
                                <h2 class="profile-name"><b>{name}</b></h2>
                                <h4 class="font-yellow">{type}</h4>
                                <h4 class="profile-desc">{description}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Webpage for Caretakers */}
            {(type === "Caretaker" || type === "Both") &&
            <section class="buttons-section">
                <div class="container">
                  <div>
                    <button className="email-button"><a className="email-link"href={"mailto:" + email}>Contact {name}</a></button>
                    {/* TODO: Need to link button add-bid */}
                    <button className="email-button">Make A Bid</button>
                  </div>
                </div>
            </section>
              }


            {/* Webpage for Caretakers */}
            {(type === "Caretaker" || type === "Both") &&
                <section class="portfolio-section section">
                <div class="portfolioContainer  margin-b-50">
                <h1 className="petowner-pets">{name}'s Services & Available Dates</h1>
                    {
                        services.map(i => {
                            return (
                                // Could be good to group by service and within the own website, differentiate by time instead of the current format
                                <div class="p-item web-design">
                                <p>Service name: {i['service']}</p>
                                <p>Service start: {i['startdate']}</p>
                                <p>Service end: {i['enddate']}</p>
                                <p>Service Description: {i['description']}</p>
                                <p>Service Rate: ${i['rate']}</p>

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
              {(type === "Petowner" || type === "Both") &&
              <section class="buttons-section">
                  <div class="container">
                  <div>
                    <button className="email-button"><a className="email-link"href={"mailto:" + email}>Contact {name}</a></button>
                  </div>
                  </div>
              </section>
                }

            {/* Webpage for PetOwners */}

            {(type === "Petowner"  || type === "Both") &&
                <section class="portfolio-section section">
                    <div class="portfolioContainer  margin-b-50">
                    <h1 className="petowner-pets">{name}'s pets</h1>
                        {
                            pets.map(i => {
                                return (
                                    <div class="p-item web-design">
                                    <p>Pet Name: {i['name']}</p>
                                    <p>Pet Breed: {i['breed']}</p>
                                    <p>Pet Age: {i['age']}</p>

                                       {/* Links to pet page */}
                                        <img src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/2018-02/vicious_dog_0.png?itok=nsghKOHs" alt="" />
                                         {/* <Button onCLick={checkMyPet(email, i['name'])}/> */}
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
