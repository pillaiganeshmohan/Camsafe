"""Detection with Haar cascade and filtering with Non-Maxima Supression (NMS)."""

from .version import __version__
import cv2
import numpy as np

class Detector(cv2.CascadeClassifier):
    """Extends the opencv haar-cascade detector, by adding the method detectAndFilter with overlap-based Non-Maxima Suppression (NMS)."""
    
    def detectAndFilter(self, 
                        image, 
                        minSize, maxSize,
                        scaleFactor=1.1,
                        score_threshold=0.5, 
                        overlap_threshold=0.3, 
                        nObjects=float("inf")):
        """Detect objects at multiple scales and filter overlapping detections with overlap-based Non-Maxima Suppression (NMS) when nObjects>1.
        
        NMS removes low score bounding-boxes, overlapping above the overlap-threshold with higher score bounding-boxes.
        When nObjects=1, the highest-score detection is returned if it is above the score-threshold, no NMS is performed.
        
        Parameters
        ----------
        image : 2D numpy array
            image in which to search objects with the cascade.
        
        minSize, maxSize : tuple of 2 int
            min and max dimensions of the bounding-boxes (width, height). 
            Limit the range of the image-pyramid for the detection.
        
        scaleFactor : float, optional 
            step size for the scale search of the image-pyramid 
            ex: 1.1 = 10% step size between minSize and maxSize.
        
        score_threshold: float, optional
            minimum bounding-box score to report a detection when Nobjects>1.
        
        overlap_threshold: float, between 0 and 1, optional
            maximum overlap between 2 neighboring bounding-boxes for the NMS (calculated as the Intersection over Union - IoU).
        
        nObjects: int
            expected number of objects (if known). 
            The detection will return up to nObjects detections but maybe less depending on the output of the NMS.
        
        Returns
        -------
        Boxes: list of list
            Up to Nobjects detected bounding-boxes, formatted as [x,y,width,height].
        
        Scores: list of float
            Score associated to each detection.
        """
        # Initial detection
        bboxes, rejectLevel, scores = self.detectMultiScale3(image,
                                                             scaleFactor,
                                                             minNeighbors = 1,
                                                             minSize = minSize,
                                                             maxSize = maxSize,
                                                             outputRejectLevels = True)
        # No detections found
        if scores.size==0:
            return [], []
                                                                   
        
        if nObjects == 1:
            
            # find highest score detection
            index = np.argmax(scores)
            score = scores[index]
            
            if score >= score_threshold:
                finalBoxes  = [bboxes[index].tolist()]
                finalScores = [score]
            
            else:
                finalBoxes=[]
                finalScores=[]
        
        
        else: # Nobject>1
            
            # NMS
            indexes = cv2.dnn.NMSBoxes(bboxes, scores, score_threshold, overlap_threshold)
            
            # final list of hits
            nBoxes = len(indexes)
            finalScores = [None] * nBoxes 
            finalBoxes  = [None] * nBoxes
            
            for i, index in enumerate(indexes):
                finalBoxes [i] = bboxes[index].tolist()
                finalScores[i] = scores[index]
            
            
            # Return up to nObjects if mentioned
            if nObjects != float("inf"):
                finalBoxes  = finalBoxes[:nObjects]
                finalScores = finalScores[:nObjects]
        
        return finalBoxes, finalScores # both are list like the original detectMultiScale3 method