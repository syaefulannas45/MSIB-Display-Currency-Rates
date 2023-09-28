import React, { useEffect, useState } from "react";

const Table = () => {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    fetchExchageRates();
  }, []);
  const fetchExchageRates = async () => {
    const API_KEY = "faccf39e6e3d4a00b5e35247c6949d93";
    const BASE_URL = "https://api.currencyfreaks.com/v2.0/rates/latest";
    const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];
    try {
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      const rates = data.rates;

      const currencyRates = currencies.map((currency) => ({
        currency,
        exchangeRate: parseFloat(rates[currency].toLocaleString("en-US", { style: "currency", currency: "USD" })).toFixed(4),
        weBuy: parseFloat(rates[currency].toLocaleString("en-US", { style: "currency", currency: "USD" })).toFixed(4) * 1.05,
        weSell: parseFloat(rates[currency].toLocaleString("en-US", { style: "currency", currency: "USD" })).toFixed(4) * 0.95,
      }));
      setCurrency(currencyRates);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Currency</td>
            <td>Exchange Rate</td>
            <td>We Buy</td>
            <td>We Sell</td>
          </tr>
        </thead>
        <tbody>
          {currency.map((item) => (
            <tr key={item.currency}>
              <td>{item.currency}</td>
              <td>{item.exchangeRate}</td>
              <td>{item.weBuy}</td>
              <td>{item.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="desc">
        <p>Rates Are Based From 1 USD</p>
        <p>This Application use API From https://currencyfreaks.com</p>
      </div>
    </>
  );
};

export default Table;
