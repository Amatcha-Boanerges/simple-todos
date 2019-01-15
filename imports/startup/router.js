//landing pages

FlowRouter.route('/',{
    action:function(){
        BlazeLayout.render('App_Body',
        {
            //header:'Landing_page',
            main:'Landing_page'
        });
    }
});