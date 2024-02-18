const transaction = require("../model/Transaction");
const stripe = require('stripe')('sk_test_51OicpKFcIATMhxWQC3f7zGIVIMVsPqupSiUGuh9tuDlgZZRH4snQltQm5jXka8Ni6lOpwKltQxBkFMWSK0RGteMl00zZu7nYXg');


//controller for adding new transaction
const checkout = async (req, res)=>{
    var success = false
    var total = req.body.totalPrice*100
    try {
        stripe.charges.create({
            amount: total,
            currency: 'usd',
            description: "service",
            source: req.body.stripeToken
          }).then(charge => {
            success = true
            console.log(charge.outcome.seller_message);
            res.json({success:success,msg:charge.outcome.seller_message})
          }).catch(error => {
            console.error(error);
            res.json({success:success,msg:error.raw.message})
          });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

module.exports = {
    checkout
}


        //creates new data in the database
        // const transactiondata = await transaction.create(req.body);
        // const session = await stripe.checkout.sessions.create({
        //     line_items: [
        //       {
        //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //         price: '{{PRICE_ID}}',
        //         quantity: 1,
        //       },
        //     ],
        //     mode: 'payment',
        //     success_url: `${YOUR_DOMAIN}/success.html`,
        //     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        //   });
        
        //   res.redirect(303, session.url);