
exports.show_results = function(req, res, next) {
    res.render('results', { formData: req.body, user: req.user, errors: {} });
}
