import fs from 'fs';

class Utils{
    // Function to read the Contents of a File given its Path
    readFileContent = (path) => fs.readFileSync(path).toString(); 

    // Function to remove Starting and Ending commas for a given row of the Data
    removeStartingAndTrailingCommas(arr){
        // Initialising all the Variables
        let ans = [];
        let start,end,cnt = 0;

        // Fetching the Valid Start(Basically removing the Starting NULL Values)
        for(start=0;start<arr.length;start++)
            if(arr[start] != '')
                break;

        // Fetching the Valid end(Basically scraping off the ending NULL Values)
        for(end=arr.length - 1;end>=0;end--)
            if(arr[end] != '')
                break;

        // Now from Start to End(Both Inclusive), we are pushing the Required Row's Values in the Final Array and returning it.
        for(let i = start;i<=end;i++)
            ans[cnt++] = arr[i];

        return ans
    }


    // Function to find the next field where there is the Closing Comma for some Corresponding Opening Comma
    findNextClosingComma(arr,start,comma){

        // We Traverse through the array and find a string which contains the Closing type of the Given Comma.If Found, we return the Index else we return -1
        for(let i = start;i<arr.length;i++){
            if(arr[i].indexOf(comma) != -1)
                return i;
        }

        return -1;
    }

    // Function to join two or more than two DataFields of a Given Data Row
    joinDataFields(arr,start,end){
        let str = "";

        // We join the DataFields of the Given Row seperated by Commas
        for(let i = start;i<=end;i++){
            str += arr[i];

            if(i != end)
                str += ',';
        }

        return str;
    }


    // Function to merge Adjacent Values enclosed within Inverted Commas
    handleInvertedCommas(arr){
        let ans = [],idx;

        for(let i = 0;i<arr.length;i++){
            idx = null;

            if(arr[i].startsWith('"')){
                idx = this.findNextClosingComma(arr,i+1,'"');
            }

            if(arr[i].startsWith("'")){
                idx = this.findNextClosingComma(arr,i+1,"'");
            }

            if(idx === null)
                ans.push(arr[i]);

            else{
                ans.push(this.joinDataFields(arr,i,idx));
                i = idx;
            }
        }

        return ans;
    }
}

// Main Exportable Class
export default class json_csv_conv{
    constructor(){
        this.UtilsObject = new Utils();
    }

    // Function to Create JSON Data from a given CSV File
    csv2json(filePath){

        // Initialising the Final Result JSON Array
        let jsonRes = [];

        // Reading the CSV Content from the File
        const csv_content = this.UtilsObject.readFileContent(filePath);

        // Splitting the whole Data(Parsed as a String) in Rows
        let rows = csv_content.split('\n');

        /* For all the Rows, we do the Following:
            1) If it is the Headers Row, then we check if there are any Starting or ending NULL Values (since Headers cannot be NULL)
            2) For every row, we handle the Values enclosed by Inverted Commas but which has been splitted due to the .split() function        
        */

        for(let i=0; i< rows.length;i++){
            let temp_row = rows[i].split(',');

            if(i == 0)
                temp_row  = this.UtilsObject.removeStartingAndTrailingCommas(temp_row);
            
            rows[i] = this.UtilsObject.handleInvertedCommas(temp_row);
        }

        // Getting the Headers from the whole Data Chunk
        const headers = rows[0];

        
        // Traversing through the Data Chunk(Except the Headers)
        for(let i = 1;i<rows.length;i++){
            let tempObj = {};

            // For all the Headers, we are searching for its corresponding value for a given Data Row. If Found, then placing it in the temporary Object created else we are placing NULL as the corresponding value to the Specific Header.
            for(let ii = 0;ii<headers.length;ii++){
                tempObj[headers[ii]] = rows[i][ii] ? rows[i][ii] : null;
            }

            // Pushing the Temporary Object Created to the Main Result Array
            jsonRes.push(tempObj);
        }

        // Returning the Final JSON Array.
        return jsonRes;
    }

}
