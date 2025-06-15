const url =
  "https://movies-data-4aa6b-default-rtdb.asia-southeast1.firebasedatabase.app/";

async function submitDataOnFirebase(data) {
  console.log(data)
  try {
    const res = await fetch(`${url}/farm-products.json`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });

    const result = await res.json();
    console.log("Data submitted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error submitting data to Firebase:", error);
    return error;
  }
}

export { submitDataOnFirebase };
