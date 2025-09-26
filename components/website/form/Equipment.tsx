"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  dateRented: string;
  dateDue: string;
  address: string;
  dateReturned: string;
  receivedBy: string;
  dlNo: string;
  state: string;
  phoneHome: string;
  phoneWork: string;
  email: string;
  signature: string;
  localAddress: string;
  localPhone: string;
  certificationLevel: string;
  certificationDate: string;
  certificationNo: string;
  agency: string;
  creditCardNumber: string;
  expDate: string;
  equipmentPreparedBy: string;
}

interface EquipmentRow {
  qty: string;
  serialNo: string;
  size: string;
  dailyRate: string;
  amount: string;
}

export default function PdfPage() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: "John Doe",
    dateRented: "2024-01-15",
    dateDue: "2024-01-20",
    address: "123 Main St, City, State",
    dateReturned: "",
    receivedBy: "",
    dlNo: "DL123456",
    state: "CA",
    phoneHome: "(555) 123-4567",
    phoneWork: "(555) 987-6543",
    email: "john.doe@email.com",
    signature: "John Doe",
    localAddress: "456 Local St, City",
    localPhone: "(555) 555-5555",
    certificationLevel: "Advanced Open Water",
    certificationDate: "2023-06-15",
    certificationNo: "CERT12345",
    agency: "PADI",
    creditCardNumber: "**** **** **** 1234",
    expDate: "12/25",
    equipmentPreparedBy: "Staff Member",
  });

  const leftSideItems = [
    "Tank(s)", "Regulator", "w/console", "w/computer", "Sidemount Rig/Mount", "BCD", 
    "Rebreather", "Exposure suit", "Wet Suit", "Dry Suit", "Dive Skin", "Hood"
  ];

  const rightSideItems = [
    "Mask", "Snorkel", "Fins", "Boots", "Gloves", "w/Weights ___ kg/lb", 
    "Weight Belt ___ kg/lb", "Light", "Camera/Video", "Other", "", ""
  ];

  const [equipment, setEquipment] = useState<Record<string, EquipmentRow>>(() => {
    const initialEquipment: Record<string, EquipmentRow> = {};
    [...leftSideItems, ...rightSideItems].forEach(item => {
      initialEquipment[item] = { qty: "", serialNo: "", size: "", dailyRate: "", amount: "" };
    });
    return initialEquipment;
  });

  const [totals, setTotals] = useState({
    totalDays: "",
    totalPerDay: "",
    totalDue: "",
    creditCard: "",
    cash: "",
    subtotal: "",
    tax: "",
    total: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEquipmentChange = (item: string, field: keyof EquipmentRow, value: string) => {
    setEquipment(prev => ({
      ...prev,
      [item]: {
        ...prev[item],
        [field]: value
      }
    }));
  };

  const handleTotalsChange = (field: string, value: string) => {
    setTotals(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownloadPdf = async () => {
    if (!page1Ref.current || !page2Ref.current) {
      alert('PDF elements not found');
      return;
    }

    try {
      // Create HTML content for PDF
      const page1Content = page1Ref.current.innerHTML;
      const page2Content = page2Ref.current.innerHTML;

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to download PDF');
        return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Equipment Rental Agreement</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              font-size: 12px;
              line-height: 1.4;
              color: black;
            }
            .page { 
              width: 8.5in; 
              min-height: 11in; 
              padding: 0.5in; 
              margin: 0 auto;
              background: white;
              page-break-after: always;
            }
            .page:last-child { page-break-after: auto; }
            table { 
              border-collapse: collapse; 
              width: 100%;
              margin: 10px 0;
            }
            th, td { 
              border: 1px solid black; 
              padding: 4px; 
              text-align: left;
              font-size: 11px;
            }
            th { background-color: #f0f0f0; font-weight: bold; }
            input { 
              border: none; 
              border-bottom: 1px solid black; 
              background: transparent; 
              padding: 2px;
              font-family: inherit;
              font-size: inherit;
            }
            .no-border-input {
              border: none !important;
              background: transparent;
              outline: none;
            }
            h1, h2 { text-align: center; margin-bottom: 10px; }
            h1 { font-size: 14px; }
            h2 { font-size: 16px; }
            .center { text-align: center; }
            .border-bottom { border-bottom: 2px solid black; padding-bottom: 10px; margin-bottom: 15px; }
            .signature-line { 
              border-bottom: 2px solid black; 
              min-height: 40px; 
              display: inline-block; 
              width: 300px;
              padding: 5px 0;
            }
            @media print {
              body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="page">${page1Content}</div>
          <div class="page">${page2Content}</div>
          <script>
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            }, 1000);
          </script>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert('PDF generation failed. Please try again.');
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page 1 - Form with Table */}
      <div
        ref={page1Ref}
        className="bg-white shadow-lg rounded-lg border border-gray-200"
        style={{ 
          width: '794px', 
          minHeight: '1123px', 
          margin: '0 auto',
          padding: '40px'
        }}
      >
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-black pb-4">
          <h1 className="text-sm font-bold text-black mb-1">
            Release of Liability/Assumption of Risk/Non-agency Acknowledgement Form
          </h1>
          <h2 className="text-lg font-bold text-black mb-2">EQUIPMENT RENTAL AGREEMENT</h2>
          <div className="text-xs text-right">
            PRODUCT NO. 10087 (Rev. 12/12) Version 5.01 © PADI 2012
          </div>
        </div>

        {/* Personal Information Fields */}
        <div className="space-y-3 mb-6" style={{fontSize: '12px'}}>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '300px', fontSize: '12px'}}
            />
            <span className="font-semibold ml-8">Date Rented</span>
            <input
              type="date"
              name="dateRented"
              value={formData.dateRented}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '120px', fontSize: '12px'}}
            />
            <span className="font-semibold ml-4">Date Due</span>
            <input
              type="date"
              name="dateDue"
              value={formData.dateDue}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '120px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">Address</span>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '500px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">Phone Home (</span>
            <input
              type="tel"
              name="phoneHome"
              value={formData.phoneHome}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '120px', fontSize: '12px'}}
            />
            <span>)</span>
            <span className="font-semibold ml-8">Date Returned</span>
            <input
              type="date"
              name="dateReturned"
              value={formData.dateReturned}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '120px', fontSize: '12px'}}
            />
            <span className="font-semibold ml-4">Received By</span>
            <input
              type="text"
              name="receivedBy"
              value={formData.receivedBy}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '100px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">Phone Work (</span>
            <input
              type="tel"
              name="phoneWork"
              value={formData.phoneWork}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '120px', fontSize: '12px'}}
            />
            <span>)</span>
            <span className="font-semibold ml-8">D/L No.</span>
            <input
              type="text"
              name="dlNo"
              value={formData.dlNo}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '120px', fontSize: '12px'}}
            />
            <span className="font-semibold ml-4">State</span>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '40px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">Email Address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '250px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">Local Address</span>
            <input
              type="text"
              name="localAddress"
              value={formData.localAddress}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '350px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">Local Phone (</span>
            <input
              type="tel"
              name="localPhone"
              value={formData.localPhone}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '120px', fontSize: '12px'}}
            />
            <span>)</span>
            <span className="font-semibold ml-8">Credit Card Number</span>
            <input
              type="text"
              name="creditCardNumber"
              value={formData.creditCardNumber}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '180px', fontSize: '12px'}}
            />
            <span className="font-semibold ml-4">Exp. Date</span>
            <input
              type="text"
              name="expDate"
              value={formData.expDate}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '60px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="font-semibold">Signature*</span>
            <input
              type="text"
              name="signature"
              value={formData.signature}
              onChange={handleInputChange}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-2"
              style={{width: '300px', fontSize: '14px', fontStyle: 'italic'}}
              placeholder="Type your signature here"
            />
          </div>
        </div>

        {/* Authorization text */}
        <div className="text-xs mb-4 italic">
          *I authorize the Dive Center/Resort to charge my credit card the daily rate if equipment is not returned by due date
        </div>

        {/* Certification section */}
        <div className="flex items-center gap-4 mb-6" style={{fontSize: '12px'}}>
          <span className="font-semibold">Certification Level</span>
          <input
            type="text"
            name="certificationLevel"
            value={formData.certificationLevel}
            onChange={handleInputChange}
            className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
            style={{width: '150px', fontSize: '12px'}}
          />
          <span className="font-semibold ml-4">Date</span>
          <input
            type="date"
            name="certificationDate"
            value={formData.certificationDate}
            onChange={handleInputChange}
            className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
            style={{width: '120px', fontSize: '12px'}}
          />
          <span className="font-semibold ml-4">Certification #</span>
          <input
            type="text"
            name="certificationNo"
            value={formData.certificationNo}
            onChange={handleInputChange}
            className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
            style={{width: '120px', fontSize: '12px'}}
          />
          <span className="font-semibold ml-4">Agency</span>
          <input
            type="text"
            name="agency"
            value={formData.agency}
            onChange={handleInputChange}
            className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
            style={{width: '60px', fontSize: '12px'}}
          />
        </div>

        {/* Equipment prepared by */}
        <div className="flex items-center gap-4 mb-6" style={{fontSize: '12px'}}>
          <span className="font-semibold">Equipment prepared by</span>
          <input
            type="text"
            name="equipmentPreparedBy"
            value={formData.equipmentPreparedBy}
            onChange={handleInputChange}
            className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
            style={{width: '300px', fontSize: '12px'}}
          />
          <span>, (Dive Center/Resort Employee)</span>
        </div>

        {/* Equipment Table */}
        <div className="mb-6">
          <table className="w-full border-collapse" style={{border: '2px solid black', fontSize: '11px'}}>
            <thead>
              <tr>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '40px'}}>QTY</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0'}}>ITEM</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '80px'}}>SERIAL #</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '50px'}}>SIZE</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '70px'}}>DAILY RATE</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '70px'}}>AMOUNT</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '40px'}}>QTY</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0'}}>ITEM</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '80px'}}>SERIAL #</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '50px'}}>SIZE</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '70px'}}>DAILY RATE</th>
                <th style={{border: '1px solid black', padding: '4px', backgroundColor: '#f0f0f0', width: '70px'}}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {leftSideItems.map((leftItem, index) => {
                const rightItem = rightSideItems[index] || "";
                return (
                  <tr key={index}>
                    {/* Left side */}
                    <td style={{border: '1px solid black', padding: '2px', textAlign: 'center'}}>
                      <input
                        type="text"
                        value={equipment[leftItem]?.qty || ""}
                        onChange={(e) => handleEquipmentChange(leftItem, 'qty', e.target.value)}
                        className="border-none bg-transparent outline-none w-full text-center"
                        style={{fontSize: '11px'}}
                      />
                    </td>
                    <td style={{border: '1px solid black', padding: '4px', fontWeight: 'bold'}}>{leftItem}</td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      <input
                        type="text"
                        value={equipment[leftItem]?.serialNo || ""}
                        onChange={(e) => handleEquipmentChange(leftItem, 'serialNo', e.target.value)}
                        className="border-none bg-transparent outline-none w-full text-center"
                        style={{fontSize: '11px'}}
                      />
                    </td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      <input
                        type="text"
                        value={equipment[leftItem]?.size || ""}
                        onChange={(e) => handleEquipmentChange(leftItem, 'size', e.target.value)}
                        className="border-none bg-transparent outline-none w-full text-center"
                        style={{fontSize: '11px'}}
                      />
                    </td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      <input
                        type="text"
                        value={equipment[leftItem]?.dailyRate || ""}
                        onChange={(e) => handleEquipmentChange(leftItem, 'dailyRate', e.target.value)}
                        className="border-none bg-transparent outline-none w-full text-center"
                        style={{fontSize: '11px'}}
                      />
                    </td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      <input
                        type="text"
                        value={equipment[leftItem]?.amount || ""}
                        onChange={(e) => handleEquipmentChange(leftItem, 'amount', e.target.value)}
                        className="border-none bg-transparent outline-none w-full text-center"
                        style={{fontSize: '11px'}}
                      />
                    </td>
                    
                    {/* Right side */}
                    <td style={{border: '1px solid black', padding: '2px', textAlign: 'center'}}>
                      {rightItem && (
                        <input
                          type="text"
                          value={equipment[rightItem]?.qty || ""}
                          onChange={(e) => handleEquipmentChange(rightItem, 'qty', e.target.value)}
                          className="border-none bg-transparent outline-none w-full text-center"
                          style={{fontSize: '11px'}}
                        />
                      )}
                    </td>
                    <td style={{border: '1px solid black', padding: '4px', fontWeight: 'bold'}}>{rightItem}</td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      {rightItem && (
                        <input
                          type="text"
                          value={equipment[rightItem]?.serialNo || ""}
                          onChange={(e) => handleEquipmentChange(rightItem, 'serialNo', e.target.value)}
                          className="border-none bg-transparent outline-none w-full text-center"
                          style={{fontSize: '11px'}}
                        />
                      )}
                    </td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      {rightItem && (
                        <input
                          type="text"
                          value={equipment[rightItem]?.size || ""}
                          onChange={(e) => handleEquipmentChange(rightItem, 'size', e.target.value)}
                          className="border-none bg-transparent outline-none w-full text-center"
                          style={{fontSize: '11px'}}
                        />
                      )}
                    </td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      {rightItem && (
                        <input
                          type="text"
                          value={equipment[rightItem]?.dailyRate || ""}
                          onChange={(e) => handleEquipmentChange(rightItem, 'dailyRate', e.target.value)}
                          className="border-none bg-transparent outline-none w-full text-center"
                          style={{fontSize: '11px'}}
                        />
                      )}
                    </td>
                    <td style={{border: '1px solid black', padding: '2px'}}>
                      {rightItem && (
                        <input
                          type="text"
                          value={equipment[rightItem]?.amount || ""}
                          onChange={(e) => handleEquipmentChange(rightItem, 'amount', e.target.value)}
                          className="border-none bg-transparent outline-none w-full text-center"
                          style={{fontSize: '11px'}}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="space-y-3 mb-6" style={{fontSize: '12px'}}>
          <div className="flex items-center gap-4">
            <span className="font-semibold">SUBTOTAL</span>
            <input
              type="text"
              value={totals.subtotal}
              onChange={(e) => handleTotalsChange('subtotal', e.target.value)}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '80px', fontSize: '12px'}}
            />
            <span className="font-semibold">+ TAX</span>
            <input
              type="text"
              value={totals.tax}
              onChange={(e) => handleTotalsChange('tax', e.target.value)}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '60px', fontSize: '12px'}}
            />
            <span className="font-semibold">= TOTAL</span>
            <input
              type="text"
              value={totals.total}
              onChange={(e) => handleTotalsChange('total', e.target.value)}
              className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
              style={{width: '80px', fontSize: '12px'}}
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="font-semibold">TOTAL DAYS</span>
              <input
                type="text"
                value={totals.totalDays}
                onChange={(e) => handleTotalsChange('totalDays', e.target.value)}
                className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
                style={{width: '80px', fontSize: '12px'}}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">TOTAL PER DAY</span>
              <input
                type="text"
                value={totals.totalPerDay}
                onChange={(e) => handleTotalsChange('totalPerDay', e.target.value)}
                className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
                style={{width: '80px', fontSize: '12px'}}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">TOTAL DUE</span>
              <input
                type="text"
                value={totals.totalDue}
                onChange={(e) => handleTotalsChange('totalDue', e.target.value)}
                className="border-none border-b border-black bg-transparent outline-none px-2 py-1"
                style={{width: '80px', fontSize: '12px'}}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">RETURN DEPOSIT</span>
            <span className="border-b border-black px-4 py-1 inline-flex items-center gap-4" style={{width: '400px'}}>
              <span>CREDIT CARD</span>
              <input
                type="text"
                value={totals.creditCard}
                onChange={(e) => handleTotalsChange('creditCard', e.target.value)}
                className="border-none bg-transparent outline-none"
                style={{width: '100px', fontSize: '12px'}}
              />
              <span>CASH</span>
              <input
                type="text"
                value={totals.cash}
                onChange={(e) => handleTotalsChange('cash', e.target.value)}
                className="border-none bg-transparent outline-none"
                style={{width: '100px', fontSize: '12px'}}
              />
            </span>
          </div>
        </div>

        <div className="text-xs text-right">
          - page 1 of 2 -
        </div>
      </div>

      {/* Page 2 - Legal Text */}
      <div
        ref={page2Ref}
        className="bg-white shadow-lg rounded-lg border border-gray-200"
        style={{ 
          width: '794px', 
          minHeight: '1123px', 
          margin: '0 auto',
          padding: '40px'
        }}
      >
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-black pb-4">
          <h1 className="text-sm font-bold text-black mb-1">
            Release of Liability/Assumption of Risk/Non-agency Acknowledgement Form
          </h1>
          <h2 className="text-lg font-bold text-black mb-2">EQUIPMENT RENTAL AGREEMENT</h2>
          <div className="text-xs font-semibold">Please read carefully and fill in all blanks before signing.</div>
        </div>

        <div className="text-xs text-black space-y-4 leading-relaxed">
          <p>
            THIS AGREEMENT is entered into between{" "}
            <span className="border-b border-black inline-block min-w-[200px] px-1">
              Scuba Life & their instructors
            </span>{" "}
            and{" "}
            <span className="border-b border-black inline-block min-w-[150px] px-1">
              {formData.name}
            </span>
            , for the rental of scuba and/or skin diving equipment. This AGREEMENT is a release of my rights and the rights of my heirs, assigns or beneficiaries to sue for injuries or death resulting from the rental and/or use of this equipment. I personally assume all risks of skin and/or scuba diving, whether foreseen or unforeseen, related in any way to the rental and/or use of this equipment.
          </p>

          <div className="font-bold">Non-Agency Disclosure and Acknowledgment Agreement</div>
          
          <p>
            I understand and agree that PADI Members ("Members"), including{" "}
            <span className="border-b border-black inline-block min-w-[200px] px-1">
              Scuba Life & their instructors
            </span>{" "}
            and/or any individual PADI Instructors and Divemasters associated with the program in which I am participating, are licensed to use various PADI Trademarks and to conduct PADI training, but are not agents, employees or franchisees of PADI Americas, Inc, or its parent, subsidiary and affiliated corporations ("PADI"). I further understand that Member business activities are independent, and are neither owned nor operated by PADI, and that while PADI establishes the standards for PADI diver training programs, it is not responsible for, nor does it have the right to control, the operation of the Members' business activities and the day-to-day conduct of PADI programs and supervision of divers by the Members or their associated staff. I further understand and agree on behalf of myself, my heirs and my estate that in the event of an injury or death during this activity, neither I nor my estate shall seek to hold PADI liable for the actions, inactions or negligence of{" "}
            <span className="border-b border-black inline-block min-w-[200px] px-1">
              Scuba Life & their instructors
            </span>{" "}
            and/or the instructors and divemasters associated with the activity.
          </p>

          <div className="font-bold">Liability Release and Assumption of Risk Agreement</div>
          
          <p>
            I understand and agree that{" "}
            <span className="border-b border-black inline-block min-w-[200px] px-1">
              Scuba Life & their instructors
            </span>
            , and its employees, owners, officers, contractor, assigns or agents (hereinafter referred to as "Released Parties"), shall not be held liable or responsible in any way for any injury, death or other damages to me, my family, estate, heirs or assigns which may occur as a result of the rental and/or use of the equipment, or as a result of product defect, or the negligence of any party, including the Released Parties, whether passive or active.
          </p>

          <p>
            I hereby acknowledge receipt of the equipment designated in this form, and, if any of this equipment is to be used for scuba diving I affirm I am a certified scuba diver or student diver in a scuba diving course/program under the supervision of a certified scuba instructor.
          </p>

          <p>
            I affirm it is my responsibility to inspect all of the equipment and acknowledge it is in good working condition. I affirm that it is my responsibility to check both the quality and quantity of gas in any scuba tanks. I acknowledge that I should not dive if the equipment is not functioning properly. I will not hold the Released Parties responsible for my failure to inspect the equipment prior to diving or if I choose to dive with equipment that may not be functioning properly.
          </p>

          <p>
            I understand that skin diving and scuba diving are physically strenuous activities, that I will be exerting myself during these activities, and that if I am injured as a result of heart attack, panic, hyperventilation, drowning or any other cause, that I expressly assume the risk of said injuries and that I will not hold the Released Parties responsible for the same.
          </p>

          <p>
            I agree to reimburse the Dive Center/Resort for the loss or breakage of any and all equipment at the current replacement value and to also pay for damages incurred while transporting the equipment. I agree to return the equipment in clean condition and to pay a cleaning fee if not returned cleaned.
          </p>

          <p>
            I further state that I am of lawful age and legally competent to sign this liability release, or that I have acquired the written consent of my parent or guardian. I understand the terms herein are contractual and not a mere recital, and that I have signed this Agreement of my own free act and with the knowledge that I hereby agree to waive my legal rights. I further agree if any provision of this Agreement is found to be unenforceable or invalid, that provision shall be severed from this Agreement. The remainder of this Agreement will then be construed as though the unenforceable provision had never been contained herein.
          </p>

          <p>
            I understand and agree that I am not only giving up my right to sue the Released Parties but also any rights my heirs, assigns, and beneficiaries may have to sue the Released Parties resulting from my death. I further represent I have the authority to do so and that my heirs, assigns, or beneficiaries will be estopped from claiming otherwise because of my representations to the Released Parties.
          </p>

          <p>
            I,{" "}
            <span className="border-b border-black inline-block min-w-[300px] px-1">
              {formData.name}
            </span>
            , BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE THE RELEASED PARTIES AND ALL RELATED ENTITIES AS DEFINED ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH AS A RESULT OF RENTING AND/OR USING THE EQUIPMENT, HOWEVER CAUSED, INCLUDING, BUT NOT LIMITED TO PRODUCT LIABILITY OR THE NEGLIGENCE OF THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE.
          </p>

          <p className="font-bold">
            I HAVE FULLY INFORMED MYSELF AND MY HEIRS OF THE CONTENTS OF THIS NON-AGENCY DISCLOSURE AND ACKNOWLDGEMENT AGREEMENT AND LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT BY READING BOTH BEFORE SIGNING BELOW ON BEHALF OF MYSELF AND MY HEIRS.
          </p>
        </div>

        {/* Signature Section */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <div className="mb-4">
              <div className="border-b-2 border-black min-h-[60px] flex items-end pb-2">
                <span className="text-lg italic">{formData.signature}</span>
              </div>
              <div className="text-xs mt-1">Participant's Signature</div>
            </div>
            <div>
              <div className="border-b-2 border-black min-h-[40px] flex items-end pb-2">
                {formData.dateRented}
              </div>
              <div className="text-xs mt-1">Date (day/month/year)</div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <div className="border-b-2 border-black min-h-[60px]"></div>
              <div className="text-xs mt-1">Signature of Parent/Guardian (where applicable)</div>
            </div>
            <div>
              <div className="border-b-2 border-black min-h-[40px]"></div>
              <div className="text-xs mt-1">Date (day/month/year)</div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-8">
          - page 2 of 2 -
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleDownloadPdf} 
          className="px-8 py-3 text-lg font-semibold"
          size="lg"
        >
          Download PDF (2 Pages)
        </Button>
      </div>
    </div>
  );
}