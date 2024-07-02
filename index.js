// {
//   Progger: { // specialization type 'Progger'
//       salary: 1000, // salary after tax; should be integer; min: 100, max: 100000
//       tax: "15%" // tax percent; presented as a string with template `{tax}%` where 'tax' is an integer;  min: "0%", max: "99%"
//   },
//   Tester: {
//       salary: 1000,
//       tax: "10%"
//   }
// }

// [
//   {
//       name: "Masha", // name of team member
//       specialization: "Progger" // specialization should be picked from `salaries` otherwise member should be ignored in the report
//   },
//   {
//       name: "Vasya",
//       specialization: "Tester"
//   },
//   {
//       name: "Taras",
//       specialization: "Tester"
//   },
// ]

// {
//   totalBudgetTeam: 3398, // total salaries with the tax of the entire team; should be an integer (truncate the fractional part after all calculations)
//   totalBudgetProgger: 1176, // total salaries with tax for all members by 'Progger' specialization; should be an integer (truncate the fractional part after all calculations)
//   totalBudgetTester: 2222, // total salaries with tax for all members by 'Tester' specialization; should be an integer (truncate the fractional part after all calculations)
// }

const salaries1 = {
  Manager: { salary: 1000, tax: "10%" },
  Designer: { salary: 600, tax: "30%" },
  Artist: { salary: 1500, tax: "15%" },};

const team1 = [
  { name: "Misha", specialization: "Manager" },
  { name: "Max", specialization: "Designer" },
  { name: "Vova", specialization: "Designer"},
  { name: "Leo", specialization: "Artist"},];

const financeReport1 = calculateTeamFinanceReport(salaries1, team1);

console.log(JSON.stringify(financeReport1))
/* see in console
{
  "totalBudgetTeam":4590, // total budget does not match the sum of specializations due to truncation of the fractional part
  "totalBudgetManager":1111,
  "totalBudgetDesigner":1714,
  "totalBudgetArtist":1764,
}
*/

const salaries2 = {
  TeamLead: { salary: 1000, tax: "99%" },
  Architect: { salary: 9000, tax: "34%" },};

const team2 = [
  { name: "Alexander", specialization: "TeamLead" },
  { name: "Gaudi", specialization: "Architect" },
  { name: "Koolhas", specialization: "Architect" },
  { name: "Foster", specialization: "Architect" },
  { name: "Napoleon", specialization: "General" },];

const financeReport2 = calculateTeamFinanceReport(salaries2, team2);

console.log(JSON.stringify(financeReport2));
/* see in console
{"totalBudgetTeam":140909,"totalBudgetTeamLead":100000,"totalBudgetArchitect":40909}
*/


function calculateTeamFinanceReport(salaries, team){
  const specializations = Object.keys(salaries);
  const financeReport = {};

  for (let i = 0; i < specializations.length; i++) {
    const salary = salaries[specializations[i]].salary;
    const tax = parseInt(salaries[specializations[i]].tax);

    const filteredSpecialists = team.filter(({ specialization }) => specialization === specializations[i]);

    financeReport[`totalBudget${specializations[i]}`] = (salary + tax * salary / 100) * filteredSpecialists.length;
  }

  const getTotal = (financeReport) => {
    let total = 0;

    for (const report in financeReport) {
      total += financeReport[report];
    }

    return total;
  }

  const totalBudgetTeam = getTotal(financeReport);

  return {
    totalBudgetTeam,
      ...financeReport,
  };
}

