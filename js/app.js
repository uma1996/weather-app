$('#getweatherbtn').click() => {
    console.log("button clicked");
    const cityName = $('#cityName').val();
    .ajax({
        type:"GET",
        url:$(cityName)
        success:(data) =>{
            
        }
    })
}