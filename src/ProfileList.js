import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ProfileList.css";
import Profile from "./Profile";
import axios from "axios";
import Spinner from './Spinner';


const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [count, setCount] = useState(20);
  const [start, setStart] = useState(1);
  const [loading, setLoading] = useState(true);

  const observer = useRef();
  const lastProfileRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          setStart(start + count);
          let new_start=start + count;
          axios
            .get(`https://randomuser.me/api/?results=${count}&start=${new_start}`)
            .then((response) => {
              setProfiles([...profiles, ...response.data.results]);
              setLoading(false);
            });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=${count}&start=${start}`)
      .then((response) => {
        setProfiles(response.data.results);
        setLoading(false);
      });
  }, []);

  const displayProfiles = () => {
    return profiles.map((profile, index) => {
      const { name, picture, location, email, id } = profile;
      return (
        <Profile
          name={name.first + " " + name.last}
          picture={picture.medium}
          address={location.city + " , " + location.country}
          email={email}
          key={index}
        />
      );
    });
  };

  return (
    <div className="container">
        <div className="ui link cards profile_list">{displayProfiles()}</div>
      {loading && <Spinner/>}
      <div ref={lastProfileRef}></div>
    </div>
  );
};

export default ProfileList;
