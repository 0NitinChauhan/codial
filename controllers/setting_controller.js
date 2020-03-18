module.exports.settings = function(request, response){
    let locals = {"title": "Settings Page"};
    return response.render("settings", locals);
}