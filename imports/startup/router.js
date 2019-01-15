//landing pages

FlowRouter.route('/',{
    action:function(){
        // if(Meteor.userId()){
        //     //If logged in
        //     BlazeLayout.render('App_Body',
        //     {
        //         //header:'Landing_page',
        //         main:'Landing_page'
        //     }); 
        // }else{
            //If NOT logged in
            BlazeLayout.render('App_Body',
            {
                //header:'Landing_page',
                main:'Prompt_page'
            });
        //}
    }
});

FlowRouter.route('/tasks',{
    triggersEnter: [isUserLoggedIn],
    action:function(){
        BlazeLayout.render('App_Body',
        {
            //header:'Landing_page',
            main:'Landing_page'
        });
    }
});

FlowRouter.route('/logout',{
    action:function(){
        Meteor.logout(function(){
            FlowRouter.go('/');
        });
    }
});

function isUserLoggedIn(context){
        if(Meteor.userId()){
            FlowRouter.current();
        } else {
            FlowRouter.go('/')
        }
    }
