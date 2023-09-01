const request = {
  access_token: "",
  start_date: "2019-01-01",
  end_date: "2019-06-10",
};
try {
  const response = await plaidClient.investmentsTransactionsGet(request);
  const investmentTransactions = response.data.investment_transactions;
} catch (error) {
  // handle error
}
