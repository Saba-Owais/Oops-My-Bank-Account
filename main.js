#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Function to center text
function centerText(text, width) {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text + ' '.repeat(padding);
}
// Function to display welcome message
function displayWelcomeMessage(firstName, lastName) {
    const width = process.stdout.columns || 80;
    const welcomeMessage = `Welcome to ${firstName} ${lastName}!`;
    console.log(chalk.hex('#6A0DAD').bold(centerText(welcomeMessage, width)));
}
// Function to display exit message
function displayExitMessage() {
    const width = process.stdout.columns || 80;
    console.log(chalk.yellow.bold.italic(centerText(`Exiting...`, width)));
    console.log(chalk.magentaBright.bold.italic(centerText(`🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼Thank you for using "OOPS My Bank Account".🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼`, width)));
    console.log(chalk.greenBright.bold.italic(centerText(`Have a nice day! 😊`, width)));
}
console.log(chalk.hex('#6A0DAD')(`

🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼
🌸 ${chalk.bold('OOPS My Bank Account')} 🌸
🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼

`));
// Class for bankAccount
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Withdrawal
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.greenBright.bold(`💸 Withdrawal of $${amount} successful. Remaining balance is $${this.balance}`));
        }
        else {
            console.log(chalk.bgRedBright.bold(`❌ Insufficient balance.`));
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chalk.greenBright.bold(`💰 Deposit of $${amount} successful. Remaining balance: $${this.balance}`));
    }
    checkBalance() {
        console.log(chalk.magentaBright.bold(`💳 Current balance is $${this.balance}`));
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    cellNumber;
    account;
    constructor(firstName, lastName, gender, age, cellNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.cellNumber = cellNumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(7866, 700),
    new BankAccount(7867, 1000),
    new BankAccount(7868, 2000)
];
const customers = [
    new Customer('Saba', 'Owais', 'Female', 24, 3465576541, accounts[0]),
    new Customer('Zehra', 'Rizvi', 'Female', 27, 3109447538, accounts[1]),
    new Customer('Zoha', 'Khan', 'Female', 21, 3335657453, accounts[2])
];
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: 'number',
                message: 'Enter your account number:'
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            // Display welcome message with customer's name
            displayWelcomeMessage(customer.firstName, customer.lastName);
            const ans = await inquirer.prompt([
                {
                    name: 'select',
                    type: 'list',
                    message: 'Select an operation',
                    choices: [
                        { name: chalk.cyan('Check Balance'), value: 'Check Balance' },
                        { name: chalk.yellow('Deposit'), value: 'Deposit' },
                        { name: chalk.red('Withdraw'), value: 'Withdraw' },
                        { name: chalk.green('Transfer'), value: 'Transfer' },
                        { name: chalk.blue('View Transactions'), value: 'View Transactions' },
                        { name: chalk.green('Exit'), value: 'Exit' }
                    ]
                }
            ]);
            switch (ans.select) {
                case 'Deposit':
                    const depositAmount = await inquirer.prompt([
                        {
                            name: 'amount',
                            type: 'number',
                            message: 'Enter an amount for deposit:'
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case 'Withdraw':
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: 'amount',
                            type: 'number',
                            message: 'Enter an amount for Withdraw:'
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case 'Check Balance':
                    customer.account.checkBalance();
                    break;
                case 'Transfer':
                    console.log(chalk.yellow('Transfer operation is under development.'));
                    break;
                case 'View Transactions':
                    console.log(chalk.yellow('View Transactions operation is under development.'));
                    break;
                case 'Exit':
                    displayExitMessage();
                    return;
            }
        }
        else {
            console.log(chalk.bgRedBright.bold(`Invalid account number!`));
        }
    } while (true);
}
service();
