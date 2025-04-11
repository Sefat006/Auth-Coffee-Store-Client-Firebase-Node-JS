import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const SignUp = () => {

  const {createUser} = useContext(AuthContext);

    const handleSignUp = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('form sign up', email, password);
        createUser(email, password)
        .then( result => {
          console.log('user created at fb',result.user);
          // will show when created at database
          const createAt = result.user?.metadata?.creationTime;
          const newUser = { name, email, createAt}

          // save new user info to the database
          fetch('https://coffee-store-server-six-theta.vercel.app/users', {
            method : 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(newUser)
          })
          .then( res => res.json())
          .then( data => {
            // console.log('user created to db', data);
            if(data.insertedId){
              console.log('user created in db');
            }
          })
        })
        .catch( error => {
          console.log('error', error);
        })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSignUp} className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Name</label>
          <br />
          <input type="text" className="input" name="name" placeholder="Name" />
          <br />
          <label className="fieldset-label">Email</label>
          <br />
          <input type="email" className="input" name="email" placeholder="Email" />
          <br />
          <label className="fieldset-label">Password</label>
          <br />
          <input type="password" className="input" name="password" placeholder="Password" />
          {/* <div><a className="link link-hover">Forgot password?</a></div> */}
          <br />
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </fieldset>
      </form>
    </div>
  </div>
</div>
    );
};

export default SignUp;