# Example

<BarChart
    data={centre}
    title="centre wise enrollment target"
    x=city
    y=enrolment
/>


<BarChart 
    data={centre}
    x=city
    y=agency
   
    title="centre wise agency target"
/>



``` sql centre
select * from centre
```