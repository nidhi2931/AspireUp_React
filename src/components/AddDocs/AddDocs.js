import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col,Table } from 'react-bootstrap';

const AddDocs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/add_docs/get');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const groupedData=data.reduce((acc,item)=>{
      const { subject_name, topic_name, topic, files } = item;
      if(!acc[subject_name]){
        acc[subject_name]={}
      }
        if(!acc[subject_name][topic_name]){
            acc[subject_name][topic_name]={
              topic_id:topic,
              existingFiles:[],
            }
        }
        const fileToAdd = Array.isArray(files)?files:[files];
        acc[subject_name][topic_name].existingFiles= acc[subject_name][topic_name].existingFiles.concat(fileToAdd);
     
        console.log("accc",acc);
        return acc;

  },{});
        

  return (
    <div>
      <Container>
        <Row>
          <Col>
          {Object.entries(groupedData).map(([subject,topics])=>(
            <div>
           <Table>
              <thead>
                <tr>
                  <td>{subject}</td>
                </tr>
                
                {Object.entries(topics).map(([topic,details])=>{
                  const key=`${subject}-${topic}`;
                  return(
                    <tr key={key}>
                      <td>
                        </td>
                        <td>{topic}</td>
                        <td>
                          <ul className="list-unstyled mb-0">
                            {details.existingFiles.map((file,index)=>(
                              <li key={`${topic}-file-${index}`}>
                                <a href={file} target="_blank" rel="noopener noreferrer">
                                  {file.split('/').pop()}
                                </a>
                              </li>
                            ))}
                            
                          </ul>
                        </td>
                    </tr>
                  )
                })}
              </thead>
              <tbody>
              </tbody>

           </Table>
           </div>
           
            
          ))}
          
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddDocs;
