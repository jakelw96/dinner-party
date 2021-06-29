let interestArr = [];

// Clickable interests to add
let allButtons = document.querySelectorAll('button[class^=interest]');

for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener('click', function() {
    let interestID = parseInt(this.innerHTML.toString().trim().charAt(0));
    console.log(interestArr)
    interestArr.push(interestID)
  });
};

async function newPartyHandler(event) {
    event.preventDefault();

    function removeDuplicates(arr) {
      return arr.filter((value, index) => arr.indexOf(value) === index);
    };

    const party_name = document.querySelector('textarea[name="party-name"]').value;
    const party_bio = document.querySelector('textarea[name="party-description"]').value;
    const interestIds = removeDuplicates(interestArr);

    console.log(party_name);
    console.log(party_bio);
    console.log(interestIds); 
    
    
      const response = await fetch('/api/parties', {
          method: 'post',
          body: JSON.stringify({
              party_name,
              party_bio,
              interestIds
          }),
          headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
          document.location.replace('/dashboard');
          console.log("Party created")
      } else {
          alert(response.statusText);
      }
};

document.getElementById('submit').addEventListener('click', newPartyHandler);