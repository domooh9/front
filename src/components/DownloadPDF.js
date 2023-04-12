import { useState, useEffect } from 'react';
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Table, Button } from 'react-bootstrap';

function DownloadPDF() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  function generateRandomTime() {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function downloadPDF() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#user-table' });

    // Add table content to the PDF document
    const pdfContent = doc.output('blob');

    // Create a download link and click it to trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfContent);
    downloadLink.download = 'users.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div>
      <Table striped bordered hover id="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{generateRandomTime()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={downloadPDF}>Download PDF</Button>
    </div>
  );
}

export default DownloadPDF;