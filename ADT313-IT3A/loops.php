<h1>Loops</h1>
<?php
//while
$i = 1;
while ($i < 6) {
    echo $i;
    $i++;
}

//do while
$i = 1;
do {
    echo $i;
    $i++;
} while ($i < 6);

//for loop
for ($x = 0; $x <= 10; $x++) {
    echo "The number is: $x <br>";
}

//foreach loop
$colors = array("red", "green", "blue", "yellow");
foreach ($colors as $x) {
    echo "$x <br>";
}

//php break
// dapat nasa loob ng quotation marks ang <br>


?>