
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//given in exercise

/* Modification week3day3

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]; */


//Modifications for Last Part of Week3day2
$(document).ready(function() {

function convertDate(postedOn) {
  var oneDay = 1000 * 60 * 60 * 24;    //convert from milliseconds to seconds, to minutes, to hours to days
  var dateToday = Date.now();
  var postedDay = postedOn;

  var daysAgo = Math.abs(dateToday - postedDay); //absolute value of a number


  return Math.round(daysAgo/oneDay);  ///round off function
}
function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  for (var tweetInfo of tweets) {
    var $tweet = createTweetElement(tweetInfo);
    console.log($tweet);
    $('.new-tweet__container').prepend($tweet);
  };
};

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  var output = '';

   output += `<article class="tweet">
            <header>
              <img src="${escape(tweet.user.avatars.small)}"/>
              <h2>${escape(tweet.user.name)}</h2>
              <span>${escape(tweet.user.handle)}</span>
            </header>
            <p>
              ${escape(tweet.content.text)}
            </p>
            <footer>
              <div class="new-tweet__time-stamp">${escape(convertDate(tweet.created_at))} Days ago</div>
              <div class="new-tweet__icons.show">
                <i class="fa fa-flag"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
              </div>
            </footer>
          </article>`

  return output
}




//Repeat again to hover over new files.

// LOAD TWEETS WEEK3DAY3 *

const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'        //ajax method direct to tweets
    })
    .done((data) => {
      console.log(data);
      renderTweets(data);
    })
    .fail(console.error);
  };

  $('.new-tweet__container').on('modbenter', '.tweet', function() {
   // Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element //
    $(this).find('.new-tweet__icons').addClass('show');
  })

  $('.new-tweet__container').on('mouseleave', '.tweet', function() {
    $(this).find('.new-tweet__icons').removeClass('show');
  })
  //Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element.

  // form handlers
  $('.new-tweet form').on('submit', (e) => {
    event.preventDefault();          //If this method is called, the default action of the event will not be triggered//

    var textBox = $('.new-tweet textarea');

    console.log(textBox.val());
    //Get the current value of the first element in the set of matched elements or set the value of every matched element//
      //Does not accept arguements

    if (textBox.val() === '') {
      $('.tweet-append-error').remove();
      $('.new-tweet form').append(`<span class="tweet-append-error">
      Error! Tweeter box is empty,fill out form!
      </span>`);
      return;
    } else if (textBox.val().length > 140) {      //condition whe the tweet exceeds 140 chars
      $('.tweet-append-error').remove();
      $('.new-tweet form').append(`<span class="tweet-append-error">
      Error! Tweet exceeds 140 characters!
      </span>`);
      return;

    }
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $('.new-tweet form').serialize()
      //Encode a set of form elements as a string for submission.
    })
    .then((new_tweet) => {
      // console.log('new tweet created!', new_tweet);
       $('.tweet-append-error').remove();
      loadTweets();
      textBox.val('');
      $(this).find('.counter').text('140');


    })
  });

  loadTweets();

  $('.compose').on('click', function() {
    $('.new-tweet').slideToggle("fast");
      if ($('.new-tweet').is(':visible')) {
        $('.new-tweet textarea').focus();
      }
  })

});