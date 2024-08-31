<h1>Condition</h1>
<?php
$age = 20;
if ($age > 18) {
    echo "Legal age";
} else if ($age >= 0 && $age <= 10) {
    echo "something";
} else {
    echo "Minor";
}

// short hand if condition
// if condition is true, ieexecute  yung after ng question mark :
// (condition) ? true condition : else condition
$ageLabel = ($age >= 18) ? "18+" : "17-";
echo $ageLabel;

$role = 'guard';
switch ($role) {
    case 'admin':
        echo "you have full access";
        break;
    case 'faculty':
        echo "you can only accesss";
        break;
    case 'student':
        echo "you have limited access";
        break;
    default:
        echo "you have no access";
}
?>