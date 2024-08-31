<h1>Hands-On Activity | Patricia Polintan, BSIT3A</h1>
<?php
$table = array(
    "header" => array(
        "StudentID",
        "FirstName",
        "MiddleName",
        "LastName",
        "Section",
        "Course",
        "YearLevel",
    ),
    "body" =>
    array(
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        ),
        array(
            "FirstName" => "firstname",
            "MiddleName" => "middlename",
            "LastName" => "lastname",
            "Section" => "section",
            "Course" => "course",
            "YearLevel" => "yearlevel",
        )
    )
);

?>

<table border="1">

    <thead>
        <?php for (
            $i = 0;
            $i <= count($table['header']) - 1;
            $i++
        ) {
            echo "<th>" . $table['header'][$i] . "</th>";
        }
        ?>
    </thead>

    <body>
        <?php for (
            $i = 0;
            $i <= count($table['body']) - 1;
            $i++
        ) {
            echo "<tr>";
            echo "<td>" . $i . "</td>";
            echo "<td>" . $table["body"][$i]["FirstName"] . "</td>";
            echo "<td>" . $table["body"][$i]["MiddleName"] . "</td>";
            echo "<td>" . $table["body"][$i]["LastName"] . "</td>";
            echo "<td>" . $table["body"][$i]["Section"] . "</td>";
            echo "<td>" . $table["body"][$i]["Course"] . "</td>";
            echo "<td>" . $table["body"][$i]["YearLevel"] . "</td>";
        }
        ?>
    </body>



</table>