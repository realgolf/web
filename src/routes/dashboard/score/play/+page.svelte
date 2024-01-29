<h1>Course</h1>

<div class="information">
  <p>Please put in some information about the course your playing:</p>

  <form action="?/add_course" method="POST">
    <label for="course_name">Course Name:</label>
    <input type="text" name="course_name" id="course_name" />

    <label for="course_location">Course Location</label>
    <input type="text" name="course_location" id="course_name" />

    <label for="course_par">Total Course Par Info:</label>
    <input type="text" name="course_par" id="course_par" />

    <label for="course_rating">Course Rating</label>
    <input type="text" name="course_rating" id="course_rating" />

    <label for="playing_partner">Playing Partner (include yourself)</label>
    <input type="text" name="playing_partner" id="playing_partner" />
    <button>Start</button>
  </form>
</div>
