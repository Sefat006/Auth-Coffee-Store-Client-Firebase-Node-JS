import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Result } from 'postcss';

const SignIn = () => {

    const {signInUser} = useContext(AuthContext);

    const handleSignIn = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
        signInUser(email, password)
        .then( result => {
            console.log(result.user);

            // update last login time
            const lastSignInTime = result?.user?.metadata?.lastSignInTime;
            const loginInfo = {email, lastSignInTime};

            fetch(`http://localhost:5000/users`, {
              method: 'PATCH',
              headers: {'content-type':'application/json'},
              body: JSON.stringify(loginInfo)
            })
            .then( res => res.json())
            .then( data => {
              console.log('sign in info updated in db',data);
            })
        })
        .catch(error => {
            console.log(error);
        })
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign In now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSignIn} className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <br />
                <input type="email" className="input" name="email" placeholder="Email" />
                <br />
                <label className="fieldset-label">Password</label>
                <br />
                <input type="password" className="input" name="password" placeholder="Password" />
                {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                <br />
                <button className="btn btn-neutral mt-4">Sign In</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
};

export default SignIn;