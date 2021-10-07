let Data;
let cloned = $(".card-container").clone(true);

let getData = async (event) => {
  let res = await fetch("data.json");
  let data = await res.json();
  return data;
};

let showData = (event) => {
  let timeframe = event ? event.target.textContent.toLowerCase() : "weekly";

  if (event) {
    $(".basic-time-frames > div").each(function () {
      $(this).addClass("pale-blue");
    });
    $(event.target).removeClass("pale-blue");
  }

  $(".activity-cards").html("");
  Data.forEach((element) => {
    cloned.clone().appendTo(".activity-cards");

    $(".card-title").last().text(element.title);
    let bg_class = element.title.toLowerCase().split(" ").join("");
    $(".card-container")
      .last()
      .addClass("bg-" + bg_class);

    let chosenTimeFrame = element.timeframes[timeframe];
    $(".card-current")
      .last()
      .text(chosenTimeFrame["current"] + "hrs");

    let prev;
    switch (timeframe) {
      case "daily":
        prev = "Yesterday - ";
        break;
      case "weekly":
        prev = "Last Week - ";
        break;
      case "monthly":
        prev = "Last Month - ";
        break;
    }
    $(".card-previous")
      .last()
      .text(prev + chosenTimeFrame["previous"] + "hrs");
  });
};

$(document).ready(() => {
  getData()
    .then((data) => {
      Data = data;
      showData();
    })
    .catch((error) => console.log(error));
});

$(".show_days").click(showData);
$(".show_weeks").click(showData);
$(".show_months").click(showData);
