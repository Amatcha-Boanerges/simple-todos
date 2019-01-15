//landing pages

FlowRouter.route('/',{
    action:function(){
        if(Meteor.userId()){
            //If logged in
            BlazeLayout.render('App_Body',
            {
                //header:'Landing_page',
                main:'Landing_page'
            }); 
        }else{
            //If NOT logged in
            BlazeLayout.render('App_Body',
            {
                //header:'Landing_page',
                main:'Prompt_page'
            });
        }
    }
});