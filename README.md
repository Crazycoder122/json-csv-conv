# json_csv_conv : 
<hr>
<h3> This is a Simple JS Module which takes in a CSV File and converts the whole Data into JSON.</h3>
<br>
<h3>*** Now the main Question Arises, why do we need it?? *** </h3>
<br>
<h3?> Actually in JS Handling Data in form of JSON is much more easier and convenient than Handling CSV Data and in case of doing ML/AI projects, we need tonnes and tonnes of Data in form of Datasets of which 99% are CSV Files.So through this Module, we can easily download the CSV File and feed that Data in the Default Exported Class and get the Corresponding data in form of JSON.</h3>

<hr>
<h1>Usage</h1>

```js
// Always Import it as ES6 module
import csv2json from 'json-csv-conv';
(() => {
    const o1 = new csv2json();
    const ans = o1.csv2json('sample.csv');
    
    fs.writeFileSync('res.json',JSON.stringify(ans));
})();
```

<hr>
<h1>Future Plannings</h1>
<ul>
    <li>Implementing a Function for Converting a JSON Data to CSV File
</ul>

For these Future Plannings, everyone is welcome to make Contributions to this Module and make it more Strong and Bug Free.
<br>
Since the Module is recently written, it has lots of Scopes of Improvements and so everyone is welcome to make a PR and put in their Valuable Contributions.
