import React, { useEffect, useState } from "react";

const Table = ({ keyTitle, title, keyList, list }) => {
  const [currency, setCurrency] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
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

      const usdToBaseCurrency = 1 / parseFloat(rates.USD);

      const currencyRates = currencies.map((currency) => ({
        currency,
        exchangeRate: usdToBaseCurrency * parseFloat(rates[currency]),
        weBuy: usdToBaseCurrency * parseFloat(rates[currency]) * 1.05,
        weSell: usdToBaseCurrency * parseFloat(rates[currency]) * 0.95,
      }));
      setCurrency(currencyRates);
    } catch (error) {
      throw error;
    }
  };
  console.log(currency);
  return (
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
            <td>{item.exchangeRate.toFixed(4)}</td>
            <td>{item.weBuy.toFixed(4)}</td>
            <td>{item.weSell.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
