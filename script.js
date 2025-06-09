

const expenseForm = document.getElementById("expense-form")
expenseForm.addEventListener("submit",function(e){
       e.preventDefault();


       const title = document.getElementById("title").value;
       const amount = document.getElementById("amount").value;
       const date = document.getElementById("date").value;
       const category = document.getElementById("category").value;
       
       
       const expense = {
              id: Date.now(),
              title: title,
              amount: parseFloat(amount),
              date: date,
              category: category
       };
       
       let expenses= JSON.parse(localStorage.getItem("expenses"))||[];
       expenses.push(expense)
       localStorage.setItem("expenses",JSON.stringify(expenses));

       renderExpenses();
       expenseForm.reset();

});

function renderExpenses(selectedMonth = "all"){
       const expenseList = document.getElementById("expense-list");
       const totalAmount = document.getElementById("total");

       expenseList.innerHTML="";

       let expenses = JSON.parse(localStorage.getItem("expenses"))||[];


       if (selectedMonth !== "all") {
       expenses = expenses.filter(exp => {
       const expMonth = exp.date.split("-")[1]; 
       return expMonth === selectedMonth;
       });
       }

       let total = 0;

       expenses.forEach(expense => {
              const list = document.createElement("li");
              list.innerHTML = 
              `<strong>${expense.title}</strong> - ₹${expense.amount.toFixed(2)}
              <br>
              <small>${expense.date} | ${expense.category}</small>
              <button class="delete-btn" data-id="${expense.id}">Delete</button>`;

              expenseList.appendChild(list);
              total+=expense.amount;

       });

       totalAmount.textContent = total.toFixed(2);
       


       

       document.querySelectorAll(".delete-btn").forEach(button => {
              button.addEventListener("click",function(){
                     const idToDelete = parseInt(this.getAttribute("data-id"));

                     let expenses = JSON.parse(localStorage.getItem("expenses"))||[];

                     expenses = expenses.filter(exp => exp.id !== idToDelete)

                     localStorage.setItem("expenses",JSON.stringify(expenses))

                     renderExpenses();

              });
              
       });
}
       

renderExpenses();


const monthFilter = document.getElementById("month-filter");
monthFilter.addEventListener("change", () => {
  const selectedMonth = monthFilter.value;
  renderExpenses(selectedMonth); 
});