import React from 'react';
import { Link } from 'react-router-dom/dist';
import { useNavigation } from 'react-router-dom/dist';

const Redirection = () => {
    const navigate = useNavigation();
    navigate("/home", {replace: true});
    
    return (
    <>
        <div>Redirection</div>
        
    </>    
    )
    
};

export default Redirection;