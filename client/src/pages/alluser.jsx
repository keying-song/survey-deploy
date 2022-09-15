
import{useEffect, useState} from 'react'
import {Table, TableBody, TableRow, TableHead, TableCell, styled, Button} from "@mui/material";
import{getUser, deleteUser} from'../service/api.js';
import{Link} from 'react-router-dom';


const StyledTable = styled(Table)`
    width:80%;
    margin:2em auto 0 auto;
`
const Thead = styled(TableRow)`
    background: #000000;
    & > th{
        color:#fff;
        font-size:20px;
    }
`
const Tbody =styled(TableRow)`
    &>td{
        font-size:20px;
    }
`
    



const AllUsers = ()=>{
    const [users, setUsers]=useState([]);
  

    useEffect(()=>{
        getAllUsers();
    }, []);

    const getAllUsers = async()=>{
      let response =  await getUser();
      setUsers(response.data);
      //console.log(response.data);
    }

    const deleteUserDetails = async(id)=>{
        await deleteUser(id);
        getAllUsers();

    }

    return(
        <StyledTable>
            <TableHead>
                <Thead>
                        <TableCell>Id</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>phone</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell></TableCell>
                    
                </Thead>
            </TableHead>
            <TableBody>
                {
                    users.map((user, index)=>
                        <Tbody key={index}>                          
                                <TableCell >{user._id}</TableCell>
                                <TableCell >{user.name}</TableCell>
                                 <TableCell >{user.phone}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                <Button variant ="contained" style={{marginRight:10}} component={Link} to={`/edituser/${user._id}`}>Edit</Button>
                                <Button variant = "contained" color="secondary" onClick = {()=>deleteUserDetails(user._id)}>Delete</Button>
                                </TableCell>   
                        </Tbody>

                    )



                }

            </TableBody>
        </StyledTable>

    )
}
export default AllUsers;