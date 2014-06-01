(function() {
    var compassManager = CompassManager.getInstance();
    
    $(document).on("pageinit", "#compass", function(e) {
        e.preventDefault();
        
        $("#startWatchHeading").on("tap", function(e) {
            e.preventDefault();
            
            enableStartWatchHeadingButton(false); 
            
            var callback = {};
            
            callback.onSuccess = onSuccess;
            callback.onError = onError;
            
            compassManager.startWatchHeading(callback);          
        });       
        
        $("#stopWatchHeading").on("tap", function(e) {
            e.preventDefault();

            enableStartWatchHeadingButton(true);
            
            compassManager.stopWatchHeading();         
        });
           
        initPage();
    });
    
    $(document).on("pagebeforehide", "#media", function(e) {
        
        //Make sure to stop heading watch before leaving the view. 
        compassManager.stopWatchHeading();
        enableStartWatchHeadingButton(true);
    });    
    
    function initPage() {
        $("#stopWatchHeading").closest('.ui-btn').hide();     
    }
    
    function onSuccess(heading) {
        $("#compassHeading").html("Heading: " + heading.magneticHeading);    
    }
    
    function onError(error) {
        console.log("An error occurs during watch heading: " + error.code);
    }  
    
    function enableStartWatchHeadingButton(enable) {
        
        if (enable) {
            $("#startWatchHeading").button("enable");
            $("#stopWatchHeading").closest('.ui-btn').hide(); 
        } else {
            $("#startWatchHeading").button("disable");
            $("#stopWatchHeading").closest('.ui-btn').show(); 
        }
        
        $("#startWatchHeading").button("refresh");
    }
    
})();