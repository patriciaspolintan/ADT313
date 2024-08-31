<h1>Array</h1>
<?php
$cars = array("Volvo", "BMW", "Toyota");
echo $cars[0];

print_r($cars);
echo "<br/> <h1>Var Dump</h1>";
var_dump($cars);
echo "<br/> <h1>Var Dump</h1>";


// to accewss yung specific value, pwedeng gumamit ng echo
echo $cars[0];

echo "<br/> <h1>Push Values</h1>";
$cars[] = "Lexus";
print_r($cars);

//associative array
// mismo magdedeclare ng key

$user = array(
    // key => value
    "firstName" => "Patricia",
    "middleName" => "Mae",
    50
);

echo $user['firstName'];

//ADD ARRAY ITEMS
$fruits = array("Apple", "Banana", "Cherry");
$fruits[] = "Orange";
//For Associative arrays
$cars = array("brand" => "Ford", "model" => "Mustang");
$cars["color"] = "Red";

// PHP Multidimensional Arrays
// nagagamit sa database. to breakdown addresses kunware (province, barangay)
$cars = array(
    array("Volvo", 22, 18),
    array("BMW", 15, 13),
    array("Saab", 5, 2),
    array("Land Rover", 17, 15)
);

$information = array(
    "user" => array(
        "firstName" => "Pat",
        "lastName" => "Polintan",
        "class" => array(
            "course" => "bsit",
            "section" => "3a",
        )
    ),
    "address" => array(
        "province" => "bulacan",
        "barangay" => "bocaue"
    )
);

echo $information['user']['lastName'];


?>