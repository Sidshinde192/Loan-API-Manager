const customerLoan = require('../models/loanModel');
const LoanDbContext = require('../dataBasemanager/loanDBContext');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});


const dbUrl = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`
const dbName = process.env.DATABASE;
const collectionName = 'loanDetails';
const loanDbContext = new LoanDbContext(dbUrl, dbName)


exports.createLoan = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const loan = new customerLoan(req.body);
        await loan.save();
        console.log("Loan inserted successfully");
        res.status(201).json({ status: "Successfully created Customer Loan" });
    } catch (err) {
        console.error("Error inserting loan:", err);
        res.status(400).json({ status: "Failed to create loan", error: err.message });
    }
};

exports.getLoans = async(req,res) => {
    try {
        //Connection to database can be acheived inside loanDbContext
        const loans = await loanDbContext.getLoans(collectionName)
        res.status(201).json({
            status: 'Successfully found Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to find customer Loan',
            message: err
        });
    } finally{
        await loanDbContext.close();
    } 
};

exports.updateLoan = async(req,res) => {
    try {
        //Connection to database can be acheived inside loanDbContext
        const data = req.body;
        const id = req.params.id;
        const loans = await loanDbContext.updateLoans(id,data)
        res.status(201).json({
            status: 'Successfully Updated Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to Update customer Loan',
            message: err
        });
    } finally{
        await loanDbContext.close();
    } 
};

exports.deleteLoan = async(req,res) => {
    try {
        //Connection to database can be acheived inside loanDbContext
        const id = req.params.id;
        const loans = await loanDbContext.deleteLoanById(id)
        res.status(201).json({
            status: 'Successfully Deleted Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to delete Customer Loan',
            message: err
        });
    } finally{
        await loanDbContext.close();
    } 
};
