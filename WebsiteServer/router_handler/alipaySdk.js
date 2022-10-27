const alipaySdk = require("../alipaySdk/index");
const AlipayFormData = require("alipay-sdk/lib/form");
const pcpay = async (req, res) => {
    console.log(req.body);
    const formData = new AlipayFormData();
    formData.setMethod('get');

    formData.addField('notifyUrl', 'http://www.com/notify');
    formData.addField('bizContent', {
        outTradeNo: req.body.outTradeNo,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: '45.00',
        subject: 'OBS Studio',
        body: 'OBS Studio',
    });
    const resultUrl = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData });
    res.status(200).json({ resultUrl });
}

const pcpayCallback = (_req, _res) => {
}

module.exports = {
    pcpay,
    pcpayCallback
}

