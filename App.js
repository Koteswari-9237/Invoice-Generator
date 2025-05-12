// App.js
import React from 'react';
import BillDetails from './Component/BillDetails';
import ItemList from './Component/ItemList';
import TotalAmount from './Component/TotalAmount';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
    const [items, setItems] = React.useState([]);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const calculateTotalAmount = () => {
        return items.reduce(
            (total, item) =>
                total +
                item.quantity *
                item.price, 0);
    };

    const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Invoice', 20, 20);

    // Add header for the invoice items
    pdf.setFontSize(12);
    pdf.text('Item', 20, 30);
    pdf.text('Quantity', 100, 30);
    pdf.text('Price', 140, 30);

    // Add items to PDF with proper spacing
    items.forEach((item, index) => {
        const yPos = 40 + index * 10;

        // Ensure item.price is a valid number
        const price = isNaN(item.price) ? 0 : parseFloat(item.price).toFixed(2);  // Handle invalid price
        
        pdf.text(item.item, 20, yPos);
        pdf.text(item.quantity.toString(), 100, yPos);
        pdf.text(price, 140, yPos);
    });

    // Add total amount to PDF
    const totalAmount = calculateTotalAmount();
    const totalYPos = 40 + items.length * 10 + 10; // Adjusted position for total
    pdf.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, totalYPos);

    // Save the PDF
    pdf.save('invoice.pdf');
};



    return (
        <div className="App">
            <h1>Bill/Invoice Generator</h1>
            <BillDetails onAddItem={handleAddItem} />
            <ItemList items={items}
                onDeleteItem={handleDeleteItem} />
            <TotalAmount
                total={calculateTotalAmount()} />
            <button
                onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
}

export default App;