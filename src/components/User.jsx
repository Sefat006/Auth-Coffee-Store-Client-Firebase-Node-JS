import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const User = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);
    console.log();

    const handleUserDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {

            // delete user from databse
            fetch(`https://coffee-store-server-six-theta.vercel.app/users/${id}`, {
                method: 'DELETE',
            })
            .then( res => res.json())
            .then(data => {
                console.log('delete is done', data);
                if(data.deletedCount){
                    if (result.isConfirmed) {
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });

                          const remainingUsers = users.filter(user => user._id !== id);
                          setUsers(remainingUsers);
                        }
                }
            })
          });
    }

    return (
        <div>
            <h2 className="text-3xl">
                users : {users.length}
            </h2>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>email</th>
        <th>Created At</th>
        <th>Last Signed In At</th>
      </tr>
    </thead>
    <tbody> 
      {/* row */}
      {
        users.map( user => <tr key={user._id}>
            <th></th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createAt}</td>
            <td>{user.lastSignInTime}</td>
            <td><button className='btn'>E</button></td>
            <td><button onClick={() => handleUserDelete(user._id)} className='btn'>X</button></td>
          </tr>
        )
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default User;