/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
// routes for student page
    'POST /create_student': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'student'},
    'GET /manage_students': {controller: 'GenericController',
                           action: 'read',
                          viewName: 'student',
                            addModels: ['major']},
    'POST /update_student': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'student'},
    'POST /delete_student': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'student'},

    // routes for maintain grades page
    'POST /create_grade': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'grade'},
    'GET /manage_grades': {controller: 'GenericController',
                           action: 'read',
                          viewName: 'grade'},
    'POST /update_grade': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'grade'},
    'POST /delete_grade': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'grade'},
    
        // routes for maintain majors page
    'POST /create_major': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'major'},
    'GET /manage_majors': {controller: 'GenericController',
                           action: 'read',
                          viewName: 'major'},
    'POST /update_major': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'major'},
    'POST /delete_major': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'major'},
    
    // routes for maintain instructors page
    'POST /create_instructor': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'instructor'},
    'GET /manage_instructors': {controller: 'GenericController',
                           action: 'read',
                          viewName: 'instructor',
                            addModels: ['major']},
    'POST /update_instructor': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'instructor'},
    'POST /delete_instructor': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'instructor'},
    
    // routes for maintain classes page
    'POST /create_class': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'class'},
    'GET /manage_classs': {controller: 'GenericController',
                           action: 'read',
                           viewName: 'class',
                        addModels: ['instructor']},
    'POST /update_class': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'class'},
    'POST /delete_class': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'class'},
   
    // routes for maintain assignments page
    'POST /create_assignment': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'assignment'},
    'GET /manage_assignments': {controller: 'GenericController',
                           action: 'read',
                           viewName: 'assignment',
                        addModels: ['student', 'grade', 'class']},
    'POST /update_assignment': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'assignment'},
    'POST /delete_assignment': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'assignment'},
       
    // routes for maintain major classes page
    'POST /create_major_class': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'major_class'},
    'GET /manage_major_classs': {controller: 'GenericController',
                           action: 'read',
                           viewName: 'major_class',
                        addModels: ['major', 'class']},
    'POST /update_major_class': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'major_class'},
    'POST /delete_major_class': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'major_class'},
            
    // routes for maintain student classes page
    'POST /create_student_class': {controller: 'GenericController',
                           action: 'create',
                          viewName: 'student_class'},
    'GET /manage_student_classs': {controller: 'GenericController',
                           action: 'read',
                           viewName: 'student_class',
                        addModels: ['student', 'class']},
    'POST /update_student_class': {controller: 'GenericController',
                           action: 'update',
                          viewName: 'student_class'},
    'POST /delete_student_class': {controller: 'GenericController',
                           action: 'delete',
                          viewName: 'student_class'}
};
