
function random( max) {
    return Math.floor(Math.random() * (max )) ;
}

for (var i = 1; i <= 100; i++) {
    console.log(random(9));
}
