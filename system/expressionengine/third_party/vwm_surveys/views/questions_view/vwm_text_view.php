<input type="text" id="vwm_surveys_question_<?php echo $id; ?>" name="vwm_surveys_questions[<?php echo $id; ?>][data][text]" maxlength="<?php echo isset($options['max_length']) ? $options['max_length'] : 128; ?>" value="<?php echo isset($data['text']) ? legit_encode($data['text']) : NULL;?>" />