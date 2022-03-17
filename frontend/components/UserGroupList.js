import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Card, CardBody, CardTitle, CardText, CardImg, CardSubtitle, Row} from "reactstrap";
import { NextURL } from "next/dist/server/web/next-url";

const UserGroupList = () => {


    const [groupData, setGroupData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()

    function getImage(url){
        if (url != null){
            return "http://localhost:8000" + url;
        }
        return "https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
    }

    // Checking typof to only check localstorage on client-side (does not exist on server)
    // Because Next.js will render parts of website server-side
    if(typeof window !== "undefined"){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('Token')
            },
        }
    }

    const getGroupData = () => {
        fetch(`http://localhost:8000/group/`, requestOptions)
          .then((res) => res.json())
          .then((groupData) => {
            setGroupData(groupData)
            console.log(groupData)
            setLoading(false)
          })
    }

    const goToGroup = (id) =>{
        if (typeof window !== "undefined") localStorage.setItem("group", id);
        router.push("groupPage/"+id)
    }

    useEffect(() => {
        setLoading(true)
        getGroupData();
      }, [])


      if (isLoading) return <><p>Loading...</p><Progress animated color="info" value={100} /></>
      if (!groupData) return <p><h5>Ingen data</h5></p>
      if (!groupData[0]) return <p><h5>Mine grupper</h5><hr/>Ingen grupper</p>


  return (
    <div class="col-md-8">
                        
    <h5>Mine grupper</h5>
    <hr/>
    <Row
        md="4"
        sm="3"
        xs="1"
    >
    {[...groupData].map((group, i) =>(
           <>
           <Card style={{margin: "10px", minWidth: "300px" }} onClick={()=>goToGroup(group.id)}>
            <CardImg
                alt="Gruppebilde for gruppe"
                src= {getImage(group.image)}
                top
                width="150px" />
            <CardBody>
                <CardTitle tag="h5">
                {group.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {group.expanded_members.length} medlemmer
                </CardSubtitle>
                <CardText>
                    {group.description}
                </CardText>
            </CardBody>
        </Card>
        </>
    ))}
    </Row>
</div>
  )
}

export default UserGroupList